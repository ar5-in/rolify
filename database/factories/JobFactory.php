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
            'title' => fake()->randomElement([
                "Software Engineer",
                "Frontend Developer",
                "Backend Developer",
                "Fullstack Developer",
                "Web Developer",
                "Mobile App Developer",
                "Android Developer",
                "iOS Developer",
                "DevOps Engineer",
                "Site Reliability Engineer",
                "Cloud Engineer",
                "Cloud Architect",
                "Solutions Architect",
                "Data Scientist",
                "Data Analyst",
                "Data Engineer",
                "Machine Learning Engineer",
                "AI Engineer",
                "MLOps Engineer",
                "Big Data Engineer",
                "Database Administrator",
                "Database Engineer",
                "Systems Administrator",
                "Network Engineer",
                "Network Administrator",
                "Security Engineer",
                "Cybersecurity Analyst",
                "Information Security Manager",
                "Penetration Tester",
                "Security Architect",
                "Cloud Security Engineer",
                "Application Security Engineer",
                "Product Manager",
                "Technical Product Manager",
                "Project Manager IT",
                "IT Manager",
                "IT Support Specialist",
                "Help Desk Technician",
                "Service Desk Analyst",
                "Technical Support Engineer",
                "QA Engineer",
                "QA Automation Engineer",
                "Test Engineer",
                "Performance Test Engineer",
                "UI Designer",
                "UX Designer",
                "UI Developer",
                "UX Researcher",
                "Interaction Designer",
                "Frontend Architect",
                "Software Architect",
                "Principal Engineer",
                "Technical Lead",
                "Engineering Manager",
                "Director of Engineering",
                "CTO",
                "Blockchain Developer",
                "AR VR Developer",
                "Game Developer",
                "Unity Developer",
                "Embedded Systems Engineer",
                "Firmware Engineer",
                "Hardware Engineer",
                "Systems Engineer",
                "Integration Engineer",
                "Platform Engineer",
                "Cloud Native Developer",
                "Kubernetes Engineer",
                "Containerization Engineer",
                "Build and Release Engineer",
                "CI CD Engineer",
                "Automation Engineer",
                "Infrastructure Engineer",
                "IT Analyst",
                "Systems Analyst",
                "Business Systems Analyst",
                "Business Intelligence Developer",
                "BI Analyst",
                "Data Visualization Engineer",
                "Data Governance Specialist",
                "Data Privacy Officer",
                "ETL Developer",
                "CRM Developer",
                "Salesforce Developer",
                "ERP Consultant",
                "SAP Consultant",
                "Technical Writer",
                "API Developer",
                "Integration Developer",
                "Middleware Engineer",
                "Robotics Engineer",
                "IoT Engineer",
                "5G Network Engineer",
                "Cloud Support Engineer",
                "Remote IT Support Engineer",
                "IT Consultant",
                "Technology Evangelist",
                "Solutions Consultant",
                "Innovation Engineer",
                "Research Software Engineer",
            ]),
            'compensation' => fake()->randomElement(['$50,000 per year', '$20,000 per year', '$150,000 per year', '$75,000 per year']),
            'location' => fake()->randomElement(['New York', 'Los Angeles', 'Manhattan', 'Florida']),
            'is_featured' => fake()->randomElement([true, false])
        ];
    }
}
