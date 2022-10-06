import { Injectable } from '@angular/core';

/** Capacitor Modules **/
import { ConnectionStatus, Network } from '@capacitor/network';

/** Models **/
import { Question } from '@models/question.model';
import { Answer } from '@models/answer.model';
import { Profile } from '@models/profile.model';

/** Firebase Modules **/
import { getApp } from 'firebase/app';
import { User as FirebaseUser } from 'firebase/auth';
import {
  Firestore,
  DocumentReference,
  DocumentData,
  FirestoreSettings,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  getFirestore,
  initializeFirestore,
  enableIndexedDbPersistence,
  disableNetwork,
  enableNetwork,
  collection, query, where, getDocs,
  increment,
  onSnapshot,
  limitToLast,
  orderBy as orderByQuery,
  startAfter,
  endBefore
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private db: Firestore;
  private profileDocRef: DocumentReference<DocumentData>;

  constructor() { }

  async init() {
    const firestoreSettings: FirestoreSettings & { useFetchStreams: boolean } = {
      useFetchStreams: false
    };
    initializeFirestore(getApp(), firestoreSettings);
    this.db = getFirestore(getApp());
    await enableIndexedDbPersistence(this.db)
      .then(async () => {
        const status: ConnectionStatus = await Network.getStatus();
        if (!status.connected) {
          await this.disableNetwork();
        }
      })
      .catch((err) => {
        console.log('Error in persistence', err);
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  }

  async disableNetwork() {
    await disableNetwork(this.db);
  }

  async enableNetwork() {
    await enableNetwork(this.db);
  }

  /**
   * Get a user from Firestore
   *
   * @param uid
   * @returns Promise<Agent>
   */
  async getProfile(uid: string): Promise<Profile> {

    this.profileDocRef = doc(this.db, 'users', uid);
    const docSnap = await getDoc(this.profileDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    } else {
      console.log(`No user found with uid ${uid}`);
      return null;
    }

  }


  /**
   * Crea un nuevo perfil
   * Create a new profile
   *
   * @param profile
   * @returns
   */
  async createProfile(profile: Profile): Promise<void> {
    const docRef = await setDoc(doc(this.db, 'users', profile.uid), profile);
    return docRef;
  }


  /******* Questions */
  async addOneQuestion(question: Question): Promise<void> {
    console.log(question);

    const docRef = await setDoc(doc(this.db, 'questions', question.uid), question);
    return docRef;
  }


  async getInitialQuestions(): Promise<Question[]> {
    const questions: Question[] = [];
    const q = query(collection(this.db, 'questions'),
      orderByQuery('date', 'asc'), limitToLast(50));
    const querySnapshot = await getDocs(q);


    querySnapshot.forEach((document) => {
      console.log(document);

      // doc.data() is never undefined for query doc snapshots
      questions.push(document.data() as Question);
    });

    return questions;
  }


  /******* Answers */
  async getAllAnswersByQuestion(uidQuestion: string): Promise<Answer[]> {
    const answers: Answer[] = [];
    const q = query(collection(this.db, 'answers'), where('uidQuestion', '==', uidQuestion));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((document) => {
      const answerToAdd = document.data() as Answer;
      answerToAdd.uid = document.id;
      answers.push(answerToAdd);
    });

    return answers;
  }

  async addOneAnswer(answer: Answer): Promise<void> {
    const docRef = await setDoc(doc(this.db, 'answers', answer.uid), answer);
    return docRef;
  }




}
