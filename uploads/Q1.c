#include <stdio.h>
#include <stdlib.h>
int max_size = 100;
int main(int argc, char *argv[]){
	char* filename = "example_input_1.txt"; //Default if no cmd input
	if(argc>1)
		filename=argv[1];
	printf("Reading file: %s\n",filename);
	FILE *fp = fopen(filename, "r" );  //Opens and checks for file
	if (fp == NULL){
		printf("File not found\n");
		return 0;
	}
	char temp_buff[max_size]; 
	fgets (temp_buff, max_size, fp); //Reads in m
	int m = atoi(temp_buff);
	fgets (temp_buff, max_size, fp); // Reads in n
	int n = atoi(temp_buff);
	unsigned int address_int[max_size]; 
	int counter = 0;
	while(fgets (temp_buff, max_size , fp)!=NULL) //Reads and counts all addresses
		address_int[counter++] = atoi(temp_buff);
	fclose(fp); //Closes the file
	
	unsigned int bit_mask = 0;
	for(int i = 0; i<(m+n); i++) //Makes bit mask of size n+m (usually 16)
		bit_mask+= 1<<i;
	for(int i = 0; i<counter; i++){
		unsigned int page_num =(address_int[i]&bit_mask)>>m; //Calculates page number
		unsigned int offset = (address_int[i]&(bit_mask>>n)); // Calculates offset
		printf("Virtual address v%d is in page number %d and offset %d\n", i+1,page_num, offset);
	}
}