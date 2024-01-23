
export class Author {
    name: string | undefined;
    email: string | undefined;

    constructor(name, email){
        this.name = name;
        this.email = email;
    }
}

export class Authors {
    authors: Array<Author> | undefined;

    constructor(authors){
        this.authors = authors;
    }
}