export function formatPaddingStylesVar (values: Array<string>) {
    const styles = []

    switch (values.length) {
        case 1 :
            styles.push(`padding: ${values[0]}`)
            break
        case 4 :
            styles.push(`padding-block-start: ${values[0]}`)
            styles.push(`padding-block-end: ${values[1]}`)

            styles.push(`padding-inline-start: ${values[2]}`)
            styles.push(`padding-inline-end: ${values[3]}`)
            break
    }

    return styles
}
