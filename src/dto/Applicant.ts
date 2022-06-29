import { collection, doc } from "firebase/firestore/lite";
import {onValue, push, ref, set} from 'firebase/database';

import {db} from "./database";

export interface IApplicant {
    email: string;
}

export class Applicant {
    private ref = ref(db, 'applicants');

    push(obj: IApplicant) {
        return push(this.ref, obj);
    }

    set(obj: IApplicant) {
        return set(this.ref, obj)
    }

    get<T = any>() {
        return new Promise<T>((resolve, reject) => {
            onValue(this.ref, (snapshot) => {
                resolve(snapshot.val());
            }, () => reject('cancelled'))
        })
    }
}

export const applicantCollection = new Applicant();