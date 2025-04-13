import {Head} from "@inertiajs/react";
import Layout from "../Shared/Layout";
import PageHeading from "../Shared/PageHeading";

const FAQ = ({heading, questions}) => {
    const listItems = questions.map((question, key) => <li key={key}>{question}</li>);
    return <>
        <Head title={'FAQ'}>
            <title>FAQ</title>
        </Head>
        <PageHeading>Frequently Asked Questions</PageHeading>
        <ul className="list-disc ml-5 flex flex-col gap-2">
            {listItems}
        </ul>
    </>
}

FAQ.layout = (page) => <Layout>{page}</Layout>

export default FAQ;
