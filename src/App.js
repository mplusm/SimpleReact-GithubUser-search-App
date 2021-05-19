import React, { useState, useEffect } from "react"; //importing react built in components, react hooks
import { Form, Card, Image, Icon } from "semantic-ui-react"; //importing semantic ui library for good looking UI Feel
import "./styles.css"; //Importing styles

function App() {
  //defining useState

  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    //call to github API
    fetch("https://api.github.com/search/users?q={userInput} in:login")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({
    //setting app-data
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    //handling user input
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    //handling submit button
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
  };
  return (
    //app render
    <div>
      <div className="navbar"> React Github User Search App</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Login"
              name="github user login"
              onChange={handleSearch}
            />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1> {error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {following} Following
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
