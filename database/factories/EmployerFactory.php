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
        $companyName = fake()->company();
        $initials = implode('', array_slice(array_map(fn($word) => substr($word, 0, 1), explode(' ', str_replace(['-', 'AND', '&', 'OF'], ' ', strtoupper($companyName)))), 0, 2));
        $colors = fake()->randomElement([
            ['#ffffff', '#000000'],
            ['#73EEDC', '#5F1A37'],
            ['#3772FF', '#FDCA40'],
            ['#D2A1B8', '#6622CC'],
            ['#6CD4FF', '#5D576B'],
        ]);

        return [
            'user_id' => User::factory(),
            'name' => $companyName,
            'logo_url' => null,
            'initials' => $initials,
            'foreground' => $colors[0],
            'background' => $colors[1]
        ];
    }
}
