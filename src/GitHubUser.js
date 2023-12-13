export class GitHubUser{
  
  static search(username){
    // Estruturando a URL para pesquisar na api do GitHub
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
    .then(data => data.json())
    .then(({ login, name, public_repos, followers}) => ({
      login,
      name, 
      public_repos, 
      followers
    }));
  }
}