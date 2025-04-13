import {Head} from "@inertiajs/react";
import Layout from "../Shared/Layout";
import PageHeading from "../Shared/PageHeading";

const Test = ({}) => {
    return <>
        <PageHeading>This is a test page</PageHeading>
        <p>Welcome to the test page</p>
    </>
}

Test.layout = (page) => <Layout>{page}</Layout>

export default Test;
