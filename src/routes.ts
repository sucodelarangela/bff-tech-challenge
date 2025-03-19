import { Router } from "express";
import { authMiddleware } from "./middleware/authMiddleware";
import apiController from "./controllers/apiController";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API para gerenciamento de usuário
 *   - name: Account
 *     description: API para gerenciamento de contas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do usuário
 *         username:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *
 *     Account:
 *       type: object
 *       properties:
 *         account:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Id da conta
 *               type:
 *                 type: string
 *                 description: Tipo da conta
 *               userId:
 *                 type: string
 *                 description: Id do titular
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 *         cards:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Card'
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id da transação
 *         accountId:
 *           type: string
 *           description: Id da conta
 *         type:
 *           type: string
 *           description: Tipo da transação
 *         value:
 *           type: integer
 *           description: Valor da transação
 *         date:
 *           type: date-time
 *           description: Data da transação
 *
 *     Card:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id do cartão
 *         accountId:
 *           type: string
 *           description: Id da conta
 *         type:
 *           type: string
 *           description: Tipo do cartão
 *         is_blocked:
 *           type: boolean
 *           description: Status de bloqueio do cartão
 *         number:
 *           type: string
 *           description: Número do cartão
 *         dueDate:
 *           type: date-time
 *           description: Data de vencimento do cartão
 *         functions:
 *           type: string
 *           enum: [Debit, Credit]
 *           description: Funcionalidade do cartão
 *         cvc:
 *           type: string
 *           description: Código de segurança do cartão
 *         paymentDate:
 *           type: date-time
 *           description: Data de pagamento do cartão
 *         name:
 *           type: string
 *           description: Nome do titular
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: Dados retornados
 *         status:
 *           type: number
 *           description: Status HTTP
 *         message:
 *           type: string
 *           description: Mensagem descritiva
 *
 *     ApiError:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           description: Status HTTP
 *         message:
 *           type: string
 *           description: Mensagem descritiva
 *         details:
 *           type: unknown
 *           nullable: true
 *           description: Mensagem descritiva
 */

// Rotas de usuário
/**
 * @swagger
 * /bff/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "teste@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "testes"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: "Token do usuário autenticado"
 *                 status:
 *                   type: integer
 *                   description: "Código de status HTTP"
 *                 message:
 *                   type: string
 *                   description: "Mensagem associada à resposta"
 */
router.post("/login", apiController.login);

/**
 * @swagger
 * /bff/user:
 *   get:
 *     summary: Retorna o(s) usuário(s).
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Usuário carregado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: "Nome do titular da conta"
 *                     email:
 *                       type: string
 *                       description: "E-mail do titular da conta"
 *                     password:
 *                       type: string
 *                       description: "Senha do titular da conta"
 *                     id:
 *                       type: string
 *                       description: "Id do titular da conta"
 *                 status:
 *                   type: integer
 *                   description: "Código de status HTTP"
 *                 message:
 *                   type: string
 *                   description: "Mensagem associada à resposta"
 */
router.get("/user", apiController.getUser);

// Rotas de conta
/**
 * @swagger
 * /bff/account:
 *   get:
 *     summary: Retorna as informações de conta do usuário
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conta encontrada carregada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     account:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: "Id da conta"
 *                           type:
 *                             type: string
 *                             description: "Tipo de conta"
 *                           userId:
 *                             type: string
 *                             description: "Id do titular da conta"
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: "Id da transação"
 *                           accountId:
 *                             type: string
 *                             description: "Id da conta"
 *                           type:
 *                             type: string
 *                             description: "Tipo de conta"
 *                           value:
 *                             type: number
 *                             description: "Valor da transação"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: "Data e hora da transação"
 *                     cards:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: "Id do cartão"
 *                           accountId:
 *                             type: string
 *                             description: "Id da conta"
 *                           type:
 *                             type: string
 *                             description: "Tipo do cartão"
 *                           is_blocked:
 *                             type: boolean
 *                             description: "Status de bloqueio do cartão"
 *                           number:
 *                             type: string
 *                             description: "Número do cartão"
 *                           dueDate:
 *                             type: string
 *                             format: date-time
 *                             description: "Data de vencimento do cartão"
 *                           functions:
 *                             type: string
 *                             description: "Função do cartão"
 *                           cvc:
 *                             type: string
 *                             description: "Código de segurança do cartão"
 *                           paymentDate:
 *                             type: string
 *                             nullable: true
 *                             description: null
 *                           name:
 *                             type: string
 *                             description: "Nome do titular do cartão"
 *                 status:
 *                   type: integer
 *                   description: "Código de status HTTP"
 *                 message:
 *                   type: string
 *                   description: "Mensagem associada à resposta"
 *       401:
 *         description: Acesso não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: 401
 *                 message:
 *                   type: string
 *                   description: "Acesso não autorizado. Token não fornecido ou formato inválido."
 *                 details:
 *                   type: any
 *                   description: null
 */
router.get("/account", authMiddleware, apiController.getAccount);

/**
 * @swagger
 * /bff/account/{id}/statement:
 *   get:
 *     summary: "Recupera extrato de transações de uma conta"
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID da conta para a qual recuperar o extrato"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Transações carregadas com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: "ID da transação"
 *                           accountId:
 *                             type: string
 *                             description: "ID da conta associada à transação"
 *                           type:
 *                             type: string
 *                             description: "Tipo da transação (Débito ou Crédito)"
 *                           value:
 *                             type: number
 *                             description: "Valor da transação"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: "Data da transação"
 *                 status:
 *                   type: integer
 *                   description: "Código de status HTTP"
 *                 message:
 *                   type: string
 *                   description: "Mensagem associada à resposta"
 *       401:
 *         description: Acesso não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: 401
 *                 message:
 *                   type: string
 *                   description: "Acesso não autorizado. Token não fornecido ou formato inválido."
 *                 details:
 *                   type: any
 *                   description: null
 */
router.get(
  "/account/:id/statement",
  authMiddleware,
  apiController.getStatement
);

/**
 * @swagger
 * /bff/account/transaction:
 *   post:
 *     summary: Cria uma nova transação
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *                 description: ID da conta associada à transação.
 *               type:
 *                 type: string
 *                 enum: [Debit, Credit, Expense]
 *                 description: Tipo da transação (Débito, Crédito ou Despesa).
 *               value:
 *                 type: number
 *                 description: Valor da transação.
 *             required:
 *               - accountId
 *               - type
 *               - value
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID da transação.
 *                     accountId:
 *                       type: string
 *                       description: ID da conta associada à transação.
 *                     type:
 *                       type: string
 *                       description: Tipo da transação.
 *                     value:
 *                       type: number
 *                       description: Valor da transação.
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Data da transação.
 *                 status:
 *                   type: integer
 *                   description: Status da resposta.
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *       401:
 *         description: Acesso não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: 401
 *                 message:
 *                   type: string
 *                   description: "Acesso não autorizado. Token não fornecido ou formato inválido."
 *                 details:
 *                   type: string
 *                   nullable: true
 *                   description: null
 */
router.post(
  "/account/transaction",
  authMiddleware,
  apiController.createTransaction
);

export default router;
