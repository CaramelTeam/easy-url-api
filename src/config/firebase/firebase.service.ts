import { envs } from "@config/envs";
import { Injectable } from "@nestjs/common";
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
    private firebaseApp: admin.app.App;

    constructor() {
        this.firebaseApp = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: envs.firebase.projectId,
                privateKey: envs.firebase.privateKey,
                clientEmail: envs.firebase.clientEmail
            })
        })
    }


    getAuth() {
        return this.firebaseApp.auth();
    }

    async verifyToken(token: string) {
        return await this.firebaseApp.auth().verifyIdToken(token);
    }

}