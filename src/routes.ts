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

// #region Rotas de usuário

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
 *       401:
 *         description: Usuário não encontrado.
 */
router.post("/login", apiController.login);

/**
 * @swagger
 * /bff/user/create:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome do usuário titular da conta
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso.
 */
router.post("/user/create", apiController.createUser);

/**
 * @swagger
 * /bff/users:
 *   get:
 *     summary: Retorna todos os usuários.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Usuário carregado com sucesso.
 */
router.get("/users", apiController.getUsers);

/**
 * @swagger
 * /bff/user/{id}:
 *   get:
 *     summary: "Retorna as informações do usuário"
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID do usuário logado"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário carregado com sucesso /ou/ Usuário não encontrado.
 */
router.get("/user/:id", apiController.getUser);
// #endregion

// #region Rotas de conta
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
 *       401:
 *         description: Acesso não autorizado. Token não fornecido ou formato inválido.
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
 *         description: Transações carregadas com sucesso
 *       401:
 *         description: Acesso não autorizado. Token não fornecido ou formato inválido.
 */
router.get(
  "/account/:id/statement",
  authMiddleware,
  apiController.getStatement
);

/**
 * @swagger
 * /bff/account/{id}/last-transactions:
 *   get:
 *     summary: "Recupera as últimas transações da conta."
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
 *       401:
 *         description: Acesso não autorizado. Token não fornecido ou formato inválido.
 */
router.get(
  "/account/:id/last-transactions",
  authMiddleware,
  apiController.getLastTransactions
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
 *       401:
 *         description: Acesso não autorizado. Token não fornecido ou formato inválido.
 */
router.post(
  "/account/transaction",
  authMiddleware,
  apiController.createTransaction
);

/**
 * @swagger
 * /bff/account/transaction/{transactionId}:
 *   put:
 *     summary: Atualiza uma transação
 *     tags:
 *       - Account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         description: "ID da transação a ser atualizada"
 *         schema:
 *           type: string
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
 *       401:
 *         description: Acesso não autorizado. Token não fornecido ou formato inválido.
 */
router.put(
  "/account/transaction/:transactionId",
  authMiddleware,
  apiController.updateTransaction
);
// #endregion

export default router;
