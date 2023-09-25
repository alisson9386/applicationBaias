import api_baias from '../api/api-baias'

class BackService {

    //Serviços de usuários
    loginUser(access){ return api_baias.post('/users/login', access); }
    listUsers(){ return api_baias.get('/users/'); }
    listUserById(idUser){ return api_baias.get('/users/' + idUser); }
    saveUser(user){ return api_baias.post('/users/', user); }
    updateUser(user, idUser){ return api_baias.patch('/users/' + idUser, user); }
    deleteUser(idUser){ return api_baias.delete('/users/' + idUser); }
    getUser(user){return api_baias.get('/users/user/' + user); }

    //Serviços de Baias
    listBaia(){ return api_baias.get('/baia/'); }
    listBaiasEmpty(periodos){ return api_baias.post('baia/baiaByDate/', periodos)}
    listBaiaById(idBaia){ return api_baias.get('/baia/' + idBaia); }
    saveBaia(baia){ return api_baias.post('/baia/', baia); }
    updateBaia(baia, idBaia){ return api_baias.patch('/baia/' + idBaia, baia); }
    deleteBaia(idBaia){ return api_baias.delete('/baia/' + idBaia); }
    activateBaia(idBaia){ return api_baias.patch('/baia/activateBaia/' + idBaia); }

    //Serviços de tipo_user
    listTipoUser(){ return api_baias.get('/tipo-users/'); }
    listTipoUserById(idTipoUser){ return api_baias.get('/tipo-users/' + idTipoUser); }
    saveTipoUser(tipoUser){ return api_baias.post('/tipo-users/', tipoUser); }
    updateTipoUser(baia, idTipoUser){ return api_baias.patch('/tipo-users/' + idTipoUser, baia); }
    deleteTipoUser(idTipoUser){ return api_baias.delete('/tipo-users/' + idTipoUser); }

    //Serviços de setores
    listSetor(){ return api_baias.get('/setores/'); }
    listSetorById(idSetor){ return api_baias.get('/setores/' + idSetor); }
    saveSetor(setor){ return api_baias.post('/setores/', setor); }
    updateSetor(setor, idSetor){ return api_baias.patch('/setores/' + idSetor, setor); }
    deleteSetor(idSetor){ return api_baias.delete('/setores/' + idSetor); }

    //Serviços de reservas
    listReserva(){ return api_baias.get('/reservas/'); }
    listReservaById(idReserva){ return api_baias.get('/reservas/' + idReserva); }
    saveReserva(reserva){ return api_baias.post('/reservas/', reserva); }
    updateReserva(reserva, idReserva){ return api_baias.patch('/reservas/' + idReserva, reserva); }
    deleteReserva(idReserva){ return api_baias.delete('/reservas/' + idReserva); }
    listReservaByIdUser(idUser){return api_baias.get('/reservas/porUser/' + idUser); }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BackService()