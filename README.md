# Steps to setup
1. Make sure you have node 12 or newer installed: [DownloadLink](https://nodejs.org/en/)
```
node -v
```
2. Make sure you have Yarn installed (`yarn -v`) otherwise you can install it:
```bash
npm install -g yarn
```
3. install project dependencies:
 ```bash
 yarn install
 ```
4. add AWS credentials for serverless, and replace KEY,SECRET with values
```bash
serverless config credentials --provider aws --key KEY --secret SECRET --myAws
```
5. make sure you have serverless installed (`sls -v`), otherwise install it:
```bash
npm install -g serverless
```
6. initialize local db
```bash
yarn sls dynamodb create -n db
```
# Run the Project
5. To run project use this:
```bash
yarn start
```
DB local shell: `http://localhost:8000/shell`

server: `http://localhost:3002`
