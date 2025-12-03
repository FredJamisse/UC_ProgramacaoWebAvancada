module.exports = {
    success: {
        s0: { http: 201, message: "Sponsor criado com sucesso.", body: {} },
        s1: { http: 200, message: "Sponsor atualizado com sucesso.", body: {} },
        s2: { http: 200, message: "Operação realizada com sucesso.", body: {} },
        s3: { http: 200, message: "Sponsor removido com sucesso.", body: {} },
        s4: { http: 200, message: "Sponsor desativado com sucesso.", body: {} },
        s6: { http: 200, message: "Sponsor ativado com sucesso.", body: {} }
    },
    error: {
        e0: { http: 404, message: "Sponsor não encontrado." }
    }
};
