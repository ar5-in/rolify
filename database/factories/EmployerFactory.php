<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employer>
 */
class EmployerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $colors = fake()->randomElement([
            ['#ffffff', '#000000'],
            ['#73EEDC', '#5F1A37'],
            ['#3772FF', '#FDCA40'],
            ['#D2A1B8', '#6622CC'],
            ['#6CD4FF', '#5D576B'],
        ]);

        return [
            'user_id' => User::factory(),
            'name' => fake()->company(),
            'logo_url' => null,
            'initials' => fn (array $attributes) => self::getInitialsFrom($attributes['name']),
            'foreground' => $colors[0],
            'background' => $colors[1]
        ];
    }

    static protected function getInitialsFrom(string $name): string
    {
        return implode('', array_slice(array_map(fn($word) => substr($word, 0, 1), explode(' ', str_replace(['-', 'AND', '&', 'OF'], ' ', strtoupper($name)))), 0, 2));
    }
}
