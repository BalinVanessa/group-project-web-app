function ResponsiveCenterDiv({children}) {
    return (
        <div className="row">
            <div className="col-3 d-none d-lg-block" />
            <div className="col d-flex justify-content-between align-items-center">
                {children}
            </div>
            <div className="col-3 d-none d-lg-block" />
        </div>
    );
}

export default ResponsiveCenterDiv;