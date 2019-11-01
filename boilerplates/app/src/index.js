import dva from 'dva';
import './index.less';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva(createLoading());

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
