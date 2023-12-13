import { GitHubUser } from "./GitHubUser.js";

export class Favorites {
  constructor(root){
    this.root = document.querySelector(root);
    this.load();

    this.onadd();
    //GitHubUser.search('MarcosAntonioAlmeida').then(user =>console.log(user));
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
  }

  save(){
    //Depois que ele conveter o array em uma string em formato json ele vai salvar no localStore
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username){
    try{
      const userExists = this.entries.find(entry => entry.login === username);
      console.log(userExists);

      if(userExists){
        throw new Error('Usuário já cadastrado!');
      }else{
        const user = await GitHubUser.search(username);
        if(user.login === undefined){
         throw new Error('Usuário não encontrado!');
        }
        this.entries = [user, ...this.entries];
        this.update();
        this.save();
      }
    }catch(error){
     alert(error.message);
    }
  }


  delete(user){
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login);
    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

export class FavoritesView extends Favorites{
  constructor(root){
    super(root);

    this.tbody = this.root.querySelector('table tbody');

    this.update();
  }

  onadd(){
    const addButton = this.root.querySelector('.search button');
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input');
      this.add(value);
    }
  }

  update(){
    this.removeAllTr();

    
    this.entries.forEach((user) => {
      console.log(user);
      
      const row = this.createRow();
      
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user img').alt = `Imagem do usuário ${user.name}`;
      row.querySelector('.user a').href = `https://github.com/${user.login}`;
      row.querySelector('.user p').textContent = user.name;
      row.querySelector('.user span').textContent = user.login;
      row.querySelector('.repositories').textContent = user.public_repos;
      row.querySelector('.followers').textContent = user.followers;
      
      row.querySelector('.buttonRemove').onclick = () => {
        const isOk = confirm(`Tem certeza que deseja deletar o usuário: ${user.name}`);
        if(isOk){
          this.delete(user);
        }
      }

      this.tbody.append(row);
    });
  }

  createRow(){
    const tr = document.createElement('tr');

    const content = `
    <td class="user">
      <img src="" alt="">
      <a href="" target="_blank">
        <p></p>
        <span></span>
      </a>
    </td>
    <td class="repositories"></td>
    <td class="followers"></td>
    <td><button class="buttonRemove">Remover</button></td>
    `
    tr.innerHTML = content;
    
    return tr;
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove();
    });
  }
}