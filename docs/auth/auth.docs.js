/**
  @openapi
 *  paths: 
 *  /login:
 *   post:
 *    summary: Login user with email and password
 *    tags:
 *        - Auth module
 *    requestBody:
 *        description: JSON
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   correo:
 *                     type: string
 *                     example: sthefan@gmail.com
 *                   password:
 *                     type: string
 *                     example: abc123
 *            
 *    responses:
 *        200:
 *          description: Login successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVpZCI6IjYzMmQwNDRjZDljOGFhNTFjM2YzYjE4NCJ9LCJleHAiOjE2NjYzNzY2NDEsImlhdCI6MTY2NjI5MDI0MX0.rsRYXVc8spSxea-UZbpgGBSqdw0r47s_x84CkT8e8Ds
 *                   usuario:
 *                     type: object
 *                     properties:
 *                       correo:
 *                         type: string
 *                         example: sthefanopoli@email.com
 *  /google:
 *     post:
 *      summary: Sing in and create user with google
 *      tags:
 *          - Auth module
 *  
 */
