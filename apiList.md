# DevTinder Apis

## authRouter
post /signup
get /login
get /logout

## profileRouter
get /profile/view
patch /profile/edit
patch /profile/password


## connectionRequestRouter
post /request/send/:status/:userId 
post /request/review/:status/:requestId

## userRouter
get /user/requests/received
get /user/connections
get /user/feeds



status: ignored(pass), interested(like), accepted, rejected
