import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./container/store";
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
);