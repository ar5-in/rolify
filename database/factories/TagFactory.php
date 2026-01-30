<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                "JavaScript",
                "TypeScript",
                "Python",
                "Java",
                "C#",
                "PHP",
                "Go",
                "Rust",
                "C++",
                "SQL",
                "NoSQL",
                "HTML",
                "CSS",
                "React",
                "Vue.js",
                "Angular",
                "Node.js",
                "Express.js",
                "Next.js",
                "Laravel",
                "Django",
                "Flask",
                "Spring Boot",
                ".NET Core",
                "REST API",
                "GraphQL",
                "Microservices",
                "Docker",
                "Kubernetes",
                "CI/CD",
                "Git",
                "GitHub",
                "Jenkins",
                "GitHub Actions",
                "Terraform",
                "Ansible",
                "AWS",
                "Azure",
                "GCP",
                "Linux",
                "Bash",
                "PowerShell",
                "Nginx",
                "Apache",
                "MongoDB",
                "PostgreSQL",
                "MySQL",
                "Redis",
                "Elasticsearch",
                "RabbitMQ",
                "Kafka",
                "System Design",
                "OOP",
                "TDD",
                "Unit Testing",
                "e2e Testing",
                "Jest",
                "Cypress",
                "Playwright",
                "Selenium",
                "Responsive Web",
                "Figma",
                "Agile",
                "Scrum",
                "Kanban",
                "Jira",
                "API Design",
                "OAuth2",
                "JWT",
                "Authentication",
                "Authorization",
                "Cryptography",
                "Security",
                "OWASP",
                "Performance",
                "Caching",
                "Monitoring",
                "Prometheus",
                "Grafana",
                "Sentry",
                "Data Structures",
                "Algorithms",
                "Problem Solving",
                "ML",
                "Pandas",
                "NumPy",
                "Power BI",
                "Tableau",
                "Big Data",
                "Hadoop",
                "Spark",
                "Queues",
                "DDD",
                "Code Review",
            ])
        ];
    }
}
