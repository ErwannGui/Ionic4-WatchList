import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import { AES256 } from '@ionic-native/aes-256/ngx';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

    private secureKey: string;
    private secureIV: string;

    constructor(public http: HttpClient, private aes256: AES256, private platform: Platform) {
        if (this.platform.is('cordova')) {
            this.generateSecureKeyAndIV();
            const data = "hello world";
            let encryptedData = this.encrypt(data);
            let decryptedData = this.decrypt(encryptedData);
            console.log(data + ' deviens ' + encryptedData + ' puis redeviens ' + decryptedData + ' !!');
        }
        console.log('Hello CryproProvider Provider');
    }

    async generateSecureKeyAndIV() {
        this.secureKey = await this.aes256.generateSecureKey('uvpAAKtHmMTSkc1TmJaZwlIoE9xE7f5G'); // Returns a 32 bytes string
        this.secureIV = await this.aes256.generateSecureIV('L2S6BiNUswZ5tbf7'); // Returns a 16 bytes string
    }

    encrypt(data: string): any {
        this.aes256.encrypt(this.secureKey, this.secureIV, data)
            .then(res => {
                return res;
            })
            .catch(error => {
                console.error(error);
                return error;
            });
    }

    decrypt(encryptedData: string): any {
        this.aes256.decrypt(this.secureKey, this.secureIV, encryptedData)
            .then(res => {
                return res;
            })
            .catch(error => {
                console.error(error);
                return error;
            });
    }

    private generateKey(password) {
        this.aes256.generateSecureKey(password)
            .then(res => console.log('Secure Key : ',res))
            .catch(error => console.error(error));
    }

    private generateIV(password) {
        this.aes256.generateSecureIV(password)
            .then(res => console.log('Secure IV : ',res))
            .catch(error => console.error(error));
    }

}
