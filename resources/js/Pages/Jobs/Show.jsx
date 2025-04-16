const Show = ({ job }) => {
    return <>
        <div>ID: {job.id}</div>
        <div>Title: {job.title}</div>
        <div>Compensation: {job.compensation}</div>
    </>
}

export default Show;
