#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{

    // Implementation goes here.
    if (argc != 2)
    {
        printf("Not enough args\n");
        exit(1);
    }
    char *filename = argv[1];

    FILE *daFile = fopen(filename, "r");

    if (daFile == NULL)
    {
        printf("You indeed dont have daFile");
        return 1;
    }

    int size = 10;
    int i = 1;
    char *line = (char *)malloc(size * sizeof(char));
    int n = atoi(fgets(line, size, daFile));
    int m = atoi(fgets(line, size, daFile));

    while (fgets(line, size, daFile) != NULL)
    {
        unsigned int va = strtoul(line, NULL, 10);
        unsigned int power = 1 << n;
        unsigned int pagenumber = va >> n;
        unsigned int offset = va & (power - 1);
        printf("virtual address v%d is in page number %d and offset %d\n", i, pagenumber, offset);
        i++;
        // printf("%u\n", va);
    }

    fclose(daFile);

    return 0;
}