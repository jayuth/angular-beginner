import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToSpaces'
})

export class ConvertToSpacesPipe implements PipeTransform{
    // transform(target_string, replace_string)
    transform(value: string, character: string): string{
        return value.replace(character, ' ');
    }
}