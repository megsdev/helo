module.exports = {
    register: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { username, password } = req.body;

        dbInstance.create_user([username, password])
        .then( user => res.status(200).send(user))
        .catch(error => {
            res.status(500).send({errorMessage: 'something went wrong'})
            console.log('error', error)
        })
    },
    
    login: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { username, password } = req.body

        dbInstance.login([username, password])
        .then(user => {
            if(user.length) {
            res.status(200).send(user)
        } else {
            res.status(200).send('not found')
        }
        })
        .catch(error => {
            console.log('CATCH', error)
            res.status(500).send({errorMessage: 'something went wrong'})
        })
    }
}