function ResponsiveCenterDiv({children, className}) {
    return (
        <div className={`row ${className ? className : ''}`}>
            <div className="col-2 d-none d-lg-block" />
            <div className="col d-flex justify-content-between align-items-center">
                {children}
            </div>
            <div className="col-2 d-none d-lg-block" />
        </div>
    );
}

export default ResponsiveCenterDiv;