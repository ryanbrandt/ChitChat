export class User {
	userId: number;
	username: string;
	token: string;

	public constructor(userId: number, username: string, token: string){
		this.userId = userId;
		this.username = username;
		this.token = token;
	}
}

