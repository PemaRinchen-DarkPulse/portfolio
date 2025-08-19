const app = require('./api/index.js');

const port = 5001;

app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
  console.log(`Test URLs:`);
  console.log(`- Health check: http://localhost:${port}/`);
  console.log(`- Portfolio test: http://localhost:${port}/api/debug-portfolios`);
  console.log(`- Environment test: http://localhost:${port}/api/test-env`);
});
