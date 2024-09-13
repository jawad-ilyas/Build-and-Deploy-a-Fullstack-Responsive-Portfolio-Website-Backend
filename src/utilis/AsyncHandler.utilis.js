const asyncHandler = (requestHandler) => {

    return (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch((error) => {
            console.log("asyncHandler :: request Handler :: error ", error)
        })
    }

}
export { asyncHandler }