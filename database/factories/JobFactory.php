<?php

namespace Database\Factories;

use App\Models\Employer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employer_id' => Employer::factory(),
            'title' => fake()->unique()->jobTitle(),
            'compensation' => fake()->randomElement(['$50,000 per year', '$20,000 per year', '$150,000 per year', '$75,000 per year']),
            'location' => fake()->randomElement(['New York', 'Los Angeles', 'Manhattan', 'Florida']),
            'is_featured' => fake()->boolean()
        ];
    }
}
