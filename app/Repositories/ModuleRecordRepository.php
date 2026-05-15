<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Core\Database;
use PDO;

final class ModuleRecordRepository
{
    public function all(string $moduleKey): array
    {
        $stmt = $this->pdo()->prepare('SELECT * FROM module_records WHERE module_key = :module_key ORDER BY id DESC');
        $stmt->execute(['module_key' => $moduleKey]);

        return array_map(fn (array $row): array => $this->decode($row), $stmt->fetchAll());
    }

    public function find(string $moduleKey, int $id): ?array
    {
        $stmt = $this->pdo()->prepare('SELECT * FROM module_records WHERE module_key = :module_key AND id = :id LIMIT 1');
        $stmt->execute(['module_key' => $moduleKey, 'id' => $id]);
        $row = $stmt->fetch();

        return $row ? $this->decode($row) : null;
    }

    public function save(string $moduleKey, array $data, ?int $id = null): void
    {
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        if ($id !== null) {
            $stmt = $this->pdo()->prepare(
                'UPDATE module_records SET data_json = :data_json, updated_at = NOW() WHERE id = :id AND module_key = :module_key'
            );
            $stmt->execute(['data_json' => $payload, 'id' => $id, 'module_key' => $moduleKey]);
            return;
        }

        $stmt = $this->pdo()->prepare(
            'INSERT INTO module_records (module_key, data_json, created_at, updated_at) VALUES (:module_key, :data_json, NOW(), NOW())'
        );
        $stmt->execute(['module_key' => $moduleKey, 'data_json' => $payload]);
    }

    public function delete(string $moduleKey, int $id): void
    {
        $stmt = $this->pdo()->prepare('DELETE FROM module_records WHERE id = :id AND module_key = :module_key');
        $stmt->execute(['id' => $id, 'module_key' => $moduleKey]);
    }

    public function count(string $moduleKey): int
    {
        $stmt = $this->pdo()->prepare('SELECT COUNT(*) FROM module_records WHERE module_key = :module_key');
        $stmt->execute(['module_key' => $moduleKey]);

        return (int) $stmt->fetchColumn();
    }

    public function seed(string $moduleKey, array $columns, array $rows): void
    {
        if ($this->count($moduleKey) > 0) {
            return;
        }

        foreach ($rows as $row) {
            $data = [];
            foreach ($columns as $index => $column) {
                $data[$column] = $row[$index] ?? '';
            }
            $this->save($moduleKey, $data);
        }
    }

    private function decode(array $row): array
    {
        $row['data'] = json_decode($row['data_json'] ?? '{}', true) ?: [];

        return $row;
    }

    private function pdo(): PDO
    {
        return Database::connection();
    }
}
