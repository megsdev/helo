module.exports = {
    register: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { username, password } = req.body;

        dbInstance.create_user([username, password])
        .then( user => {
            req.session.userid = user[0].id;
            console.log(req.session.userid)
            res.status(200).send(user)
        })
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
                req.session.userid = user[0].id;
                console.log(req.session.userid)
                res.status(200).send(user)
        } else {
            res.status(200).send('not found')
        }
        })
        .catch(error => {
            console.log('CATCH', error)
            res.status(500).send({errorMessage: 'something went wrong'})
        })
    },

    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session)
    },

    getPosts: (req, res, next) => {
        const dbInstance = req.app.get('db')
        let { userposts, search } = req.query;
        if(!search) search = ''
        const { userId } = req.session.userid; 

        dbInstance.get_posts()
            .then(posts => {
                if(userposts && search.length) {
                    console.log('1')
                    res.status(200).send(posts.filter(post => post.title === search))
                }

                else if (!userposts && !search) {
                    console.log('2')
                    res.status(200).send(posts.filter(post => post.author_id !== userId))
                }

                else if (!userposts && search.length) {
                    console.log('3')
                    res.status(200).send(posts.filter(post => post.title === search && post.author_id !== userId))
                }

                else 
                    res.status(200).send(posts)
            })
//not fully working. need to debug. 
    },

    createPost: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { title, img, content } = req.body
        const { userId } = req.session.userid;

        dbInstance.create_post([ title, img, content, userId ])
            .then(res.sendStatus(200))
            .catch(error => {
                res.status(500).send({errorMessage: 'something went wrong'})
                console.log('error', error)
            })
    }, 

    me: (req, res, next) => {
        //query db for username and profile pic using userid stored in session and send back
    }
}