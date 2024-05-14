import { Provider } from "react-redux";
import { MainApp } from "./src/features/user/views/app_page";
import { store } from "./src/store/store";

export default function App() {
  return <Provider store={store}>{<MainApp />}</Provider>;
}
;
