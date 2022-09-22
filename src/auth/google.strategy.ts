import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "dotenv";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(
    Strategy,
    "google",
) {
    constructor() {
        super({
            clientID:
                "380741445907-bje234trnmi1go0g6ngnrpllt29v5390.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:5000/auth/google/callback",
            scope: ["email", "profile"],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
}
