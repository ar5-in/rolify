import { Head } from "@inertiajs/react";
import PageHeading from "../Shared/PageHeading";

const FAQ = ({ heading, questions }) => {
    return (
        <>
            <Head title="FAQ" />
            <PageHeading>{heading}</PageHeading>
        <ul className="list-disc ml-5 flex flex-col gap-2">
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
        </ul>
    </>
    );
};

export default FAQ;
