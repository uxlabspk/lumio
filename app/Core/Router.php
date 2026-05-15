<?php

declare(strict_types=1);

namespace App\Core;

final class Router
{
    private array $routes = [];

    public function get(string $path, callable|array $handler): void
    {
        $this->add('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->add('POST', $path, $handler);
    }

    private function add(string $method, string $path, callable|array $handler): void
    {
        $this->routes[$method][$this->normalize($path)] = $handler;
    }

    public function dispatch(string $method, string $uri): void
    {
        $path = $this->normalize(parse_url($uri, PHP_URL_PATH) ?: '/');
        $handler = $this->routes[$method][$path] ?? null;

        if ($handler === null && str_ends_with($path, '.php')) {
            $handler = $this->routes[$method][$this->normalize(substr($path, 0, -4))] ?? null;
        }

        if ($handler === null) {
            http_response_code(404);
            View::render('errors.404', ['title' => 'Page not found']);
            return;
        }

        if (is_array($handler)) {
            [$class, $methodName] = $handler;
            (new $class())->{$methodName}();
            return;
        }

        $handler();
    }

    private function normalize(string $path): string
    {
        $path = '/' . trim($path, '/');

        return $path === '/' ? '/' : rtrim($path, '/');
    }
}
