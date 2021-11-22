import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name : 'authorityTruncate'})
export class AuthorityTruncatePipe implements PipeTransform{
    transform(authority: string) {
        var authorityParts = authority.split("_");
        return authorityParts[authorityParts.length - 1];
    }
}