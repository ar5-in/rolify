import {Head} from "@inertiajs/react";
import PageHeading from "../Shared/PageHeading";
import Page from "../Shared/Page.jsx";
import Card from "../Shared/Card.jsx";
import CardHead from "../Shared/CardHead.jsx";

const FAQ = ({heading, items}) => {
    return (
        <Page heading="FAQ">
            <Head title="FAQ"/>
                <div className={`flex flex-col gap-5`}>
                {items.map((item, index) => (
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
