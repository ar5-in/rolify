import {Head} from "@inertiajs/react";
import Page from "../Shared/Page.jsx";
import Card from "../Shared/Card.jsx";
import CardHead from "../Shared/CardHead.jsx";

const FAQ = () => {
    const data = [
        {
            question: "What is Rolify?",
            answer: <><strong className="text-primary">Rolify</strong> is a job portal platform designed to help recruiters find the right candidates for open positions. It allows recruiters to manage job listings, while candidates can browse opportunities and submit their applications.</>
        },
        {
            question: "What can a recruiter do on Rolify?",
            answer: <>Recruiters can manage job postings for multiple employers or companies from a single account. They also have the power to review applications and either approve or reject them based on candidate suitability.</>
        },
        {
            question: "How do users stay updated about their application status?",
            answer: <>Rolify has an automated email notification system built-in. It automatically sends out email updates at every critical step of the process—such as when a job is posted, when a candidate applies, and when an application is approved or rejected.</>
        },
        {
            question: "What technology stack is used to build Rolify?",
            answer: (
                <>
                    Rolify is built using a powerful full-stack combination:
                    <ul>
                        <li><strong className="text-primary">Backend:</strong> Laravel (PHP framework)</li>
                        <li><strong className="text-primary">Frontend:</strong> React (JavaScript library)</li>
                        <li><strong className="text-primary">Styling:</strong> TailwindCSS (for a custom, responsive user interface)</li>
                    </ul>
                </>
            )
        },
        {
            question: "What is Inertia.js and why is it used in this project?",
            answer: <><strong className="text-primary">Inertia.js</strong> is a tool that links the Laravel backend and React frontend. It allows the application to behave like a fast, modern Single Page Application (SPA) without requiring a separate API. This keeps the user experience smooth and allows the entire codebase to live easily inside a single repository.</>
        },
        {
            question: "How and where is Rolify currently hosted?",
            answer: <>Rolify is hosted on a <strong className="text-primary">Virtual Private Server (VPS)</strong> alongside other projects. It runs on a single node without high availability (HA) infrastructure, which is ideal and cost-effective for a prototype of this scale.</>
        },
        {
            question: "How does Docker help in running this application?",
            answer: <><strong className="text-primary">Docker</strong> (running in Swarm mode) is used to containerize the application. It creates an isolated virtual environment (or "silo") for Rolify. This ensures that the application and its dependencies can run perfectly without interfering with or being affected by other projects hosted on the same server.</>
        },
        {
            question: "How is the deployment automated when code changes?",
            answer: <>The project uses <strong className="text-primary">GitHub Actions</strong> for Continuous Integration and Continuous Deployment (CI/CD). Whenever code changes are pushed to the <code>develop</code> or <code>main</code> branches, GitHub Actions automatically builds new Docker images and deploys the updated stack to the server seamlessly.</>
        },
        {
            question: "Is Rolify a fully finished commercial product?",
            answer: <>No, this current version is a prototype that serves as a <strong className="text-primary">Minimum Viable Product (MVP)</strong> or <strong className="text-primary">Proof of Concept (PoC)</strong>. It functions as a portfolio project to demonstrate practical engineering skills across full-stack development, database management, containerization, and DevOps.</>
        },
        {
            question: "Who created Rolify and where can I find the source code?",
            answer: (
                <>
                    Rolify was designed and developed by <strong className="text-primary">Arshad Ansari</strong>.
                    <ul>
                        <li>
                            You can view the open-source code on GitHub at:{' '}
                            <a className="text-primary underline" href="https://github.com/ar5-in/rolify" target="_blank" rel="noopener noreferrer">
                                github.com/ar5-in/rolify
                            </a>
                        </li>
                        <li>
                            To learn more about the developer, visit his personal website at:{' '}
                            <a className="text-primary underline" href="https://arshadansari.in" target="_blank" rel="noopener noreferrer">
                                arshadansari.in
                            </a>
                        </li>
                    </ul>
                </>
            )
        }
    ];

    return (
        <Page heading="Frequently Asked Questions">
            <Head title="Frequently Asked Questions"/>
                <div className={`flex flex-col gap-5`}>
                {data.map((item, index) => (
                    <Card key={index}>
                        <CardHead>
                            <h2 className="text-lg font-medium text-primary break-words">{item.question}</h2>
                        </CardHead>
                        <div className={`p-5`}>{item.answer}</div>
                    </Card>
                ))}
                </div>
        </Page>
    );
};

export default FAQ;
