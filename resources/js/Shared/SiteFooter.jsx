import rolifyLogo from '@/../images/rolify_logo.svg';

export default  function SiteFooter() {
    return (
        <>
            <div className={`mx-20 my-20 flex flex-col gap-5 items-center`}>
                <img className={`opacity-5 w-100`} src={rolifyLogo} alt="Rolify Logo" />
                <p className={`font-medium text-sm text-body-text/50`}>&copy; Auris Studio. All rights reserved</p>
            </div>
        </>
    );
}
