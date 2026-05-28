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
post /request/send/interested/:userId
post /request/send/ignored/:userId
post /request/review/accepted/:requestId
post /request/review/rejected/:requestId

## userRouter
get /user/connections
get /user/requests/received
get /user/feeds



status: ignored(pass), interested(like), accepted, rejected
