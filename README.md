# AnimeFlix API

## Introdução
A API do AnimeFlix permite a autenticação de usuários, a listagem de animes e episódios, e o rastreamento de episódios assistidos.

## Base URL
```
http://seuservidor/api.php
```

## Endpoints

### 1. Autenticação

#### Login
**Rota:** `GET /?endpoint=login&email={email}&password={password}`

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Login successful!"
}
```

**Resposta de Erro:**
```json
{
  "error": "Account not found"
}
```

#### Logout
**Rota:** `GET /?endpoint=logout`

**Resposta:**
```json
{
  "success": true
}
```

#### Verificar Login
**Rota:** `GET /?endpoint=verifyLogin`

**Resposta:**
```json
{
  "success": true
}
```

---

### 2. Usuários

#### Buscar Usuário
**Rota:** `GET /?endpoint=user&id={id}`

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "name": "Usuário Teste"
}
```

**Resposta de Erro:**
```json
{
  "error": "User not found"
}
```

---

### 3. Animes

#### Listar Todos os Animes
**Rota:** `GET /?endpoint=animes`

**Resposta:**
```json
{
  "animes": [
    {
      "id": 1,
      "name": "Naruto",
      "image_url": "https://example.com/naruto.jpg"
    }
  ]
}
```

#### Buscar Anime Específico
**Rota:** `GET /?endpoint=anime&id={id}`

**Resposta:**
```json
{
  "id": 1,
  "name": "Naruto",
  "image_url": "https://example.com/naruto.jpg"
}
```

#### Animes Mais Assistidos
**Rota:** `GET /?endpoint=mostViewedAnimes`

**Resposta:**
```json
{
  "animes": [
    {
      "id": 1,
      "name": "Naruto",
      "views": 1000,
      "image_url": "https://example.com/naruto.jpg"
    }
  ]
}
```

---

### 4. Episódios

#### Listar Episódios de um Anime
**Rota:** `GET /?endpoint=episodes&id={anime_id}`

**Resposta:**
```json
{
  "episodes": [
    {
      "id": 1,
      "anime_id": 1,
      "title": "Episódio 1"
    }
  ]
}
```

#### Buscar Episódio Específico
**Rota:** `GET /?endpoint=episode&id={id}`

**Resposta:**
```json
{
  "id": 1,
  "anime_id": 1,
  "title": "Episódio 1",
  "video_url": "https://example.com/video.mp4"
}
```

---

### 5. Histórico de Visualização

#### Marcar Episódio como Assistido
**Rota:** `GET /?endpoint=markEpisodeWatched&id={episode_id}`

**Resposta:**
```json
{
  "success": true
}
```

#### Listar Episódios Assistidos de um Anime
**Rota:** `GET /?endpoint=watchedEpisodes&anime_id={anime_id}`

**Resposta:**
```json
{
  "episodes": [
    {
      "id": 1,
      "anime_id": 1,
      "user_id": 1
    }
  ]
}
```

## Observações
- Todas as respostas são retornadas no formato JSON.
- A API suporta os métodos `GET`, `POST`, `PUT`, e `DELETE`, dependendo do endpoint.
- Certifique-se de estar autenticado para acessar certas rotas protegidas.

