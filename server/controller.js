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
    },

    getPosts: (req, res, next) => {
        const dbInstance = req.app.get('db')
        let { userposts, search } = req.query;
        if(!search) search = ''
        const { userId } = req.params; 

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
        const { userId } = req.params.userid;

        dbInstance.create_post([ title, img, content, userId ])
            .then(res.sendStatus(200))
            .catch(error => {
                res.status(500).send({errorMessage: 'something went wrong'})
                console.log('error', error)
            })
    }
}