module.exports = {
    success: {
        s0: { http: 201, message: "Expert criado com sucesso.", body: {} },
        s1: { http: 200, message: "Expert atualizado com sucesso.", body: {} },
        s2: { http: 200, message: "Operation realizada com sucesso.", body: {} },
        s3: { http: 200, message: "Expert removido com sucesso.", body: {} },
        s4: { http: 200, message: "Expert desativado com sucesso.", body: {} },
        s6: { http: 200, message: "Expert ativado com sucesso.", body: {} }
    },
    error: {
        e0: { http: 404, message: "Expert não encontrado." }
    }
};
