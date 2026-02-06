import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./views/Home";
import Login from "./views/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./views/auth/Register";
import Profile from "./views/profile/Profile";
import Teams from "./views/teams/Teams";
import Players from "./views/players/Players";
import Team from "./views/team/Team";
import NewProfile from "./views/profile/NewProfile";
import Confirm from "./views/auth/Confirm";
import PlayerInfo from "./views/players/PlayerInfo";
import TeamInfoView from "./views/team/TeamInfoView";
import Error404View from "./views/Error404View";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />"
          <Route path="/auth/register" element={<Register />} />"
          <Route path="/auth/confirm" element={<Confirm/>} />"
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:team_id" element={<TeamInfoView />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:player_id" element={<PlayerInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new_profile" element={<NewProfile />} />
          <Route path="/team" element={<Team />} />
          <Route path="/error" element={<Error404View />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
