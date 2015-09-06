#include <stdio.h>
#include <string.h>
#include <stdlib.h>


static void base64_init(void);

static int base64_initialized = 0;
#define BASE64_VALUE_SZ 256
#define BASE64_RESULT_SZ 10*1024*1024



int base64_value[BASE64_VALUE_SZ];
const char base64_code2[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";


static void
base64_init(void)
{
    int i;

    for (i = 0; i < BASE64_VALUE_SZ; i++)
	base64_value[i] = -1;

    for (i = 0; i < 64; i++)
	base64_value[(int) base64_code2[i]] = i;
    base64_value['='] = 0;

    base64_initialized = 1;
}





char *DecodeQuoted(const char* pSrc, int *len)
{ 
	
	int nDstLen; 
	int nSrcLen = strlen(pSrc);
	// ������ַ����� 
	static char result[BASE64_RESULT_SZ];
	char *pDst = result;
	int  i = 0; nDstLen = 0; 
	//int j = 0;
	while (i < nSrcLen)
    {
        if (strncmp(pSrc, "=\r\n", 3) == 0) // ���س������� 
        {  
        	pSrc += 3; 
        	i += 3;
        }
        else
        {
            if (*pSrc == '=') // �Ǳ����ֽ� 
            {
                sscanf(pSrc, "=%02X", pDst);
                pDst++;
                pSrc += 3;
                i += 3;
            }
            else  // �Ǳ����ֽ� 
            {
                *pDst++ = (unsigned char)*pSrc++;
                 i++;
             }
             nDstLen++;
        }
    } // ����Ӹ������� 

    *pDst = '\0';
    if(len) *len = nDstLen;
    return result;
}

char *_base64_decode(const char *p)
{
    static char result[BASE64_RESULT_SZ];
    int j;
    int c;
    long val;
    if (!p)
	return NULL;
    if (!base64_initialized)
	base64_init();
    val = c = 0;
    for (j = 0; *p && j + 4 < BASE64_RESULT_SZ; p++) {
	unsigned int k = ((unsigned char) *p) % BASE64_VALUE_SZ;
	if (base64_value[k] < 0)
	    continue;
	val <<= 6;
	val += base64_value[k];
	if (++c < 4)
	    continue;
	/* One quantum of four encoding characters/24 bit */
	result[j++] = val >> 16;	/* High 8 bits */
	result[j++] = (val >> 8) & 0xff;	/* Mid 8 bits */
	result[j++] = val & 0xff;	/* Low 8 bits */
	val = c = 0;
    }
    result[j] = 0;
    return result;
}

char *base64_decode(const char *p, int *len)
{
    static char result[BASE64_RESULT_SZ];
    int j;
    int c;
    long val;
    if (!p)
	return NULL;
    if (!base64_initialized)
	base64_init();
    val = c = 0;
    for (j = 0; *p && j + 4 < BASE64_RESULT_SZ; p++) {
	unsigned int k = ((unsigned char) *p) % BASE64_VALUE_SZ;
	if (base64_value[k] < 0)
	    continue;
	val <<= 6;
	val += base64_value[k];
	if (++c < 4)
	    continue;
	/* One quantum of four encoding characters/24 bit */
	result[j++] = val >> 16;	/* High 8 bits */
	result[j++] = (val >> 8) & 0xff;	/* Mid 8 bits */
	result[j++] = val & 0xff;	/* Low 8 bits */
	val = c = 0;
    }
    result[j] = 0;
    if(len) *len = j;
    return result;
}

/* adopted from http://ftp.sunet.se/pub2/gnu/vm/base64-encode.c with adjustments */
const char *
base64_encode(const char *decoded_str)
{
    static char result[BASE64_RESULT_SZ];
    int bits = 0;
    int char_count = 0;
    int out_cnt = 0;
    int c;

    if (!decoded_str)
	return decoded_str;

    if (!base64_initialized)
	base64_init();

    while ((c = (unsigned char) *decoded_str++) && out_cnt < sizeof(result) - 5) {
	bits += c;
	char_count++;
	if (char_count == 3) {
	    result[out_cnt++] = base64_code2[bits >> 18];
	    result[out_cnt++] = base64_code2[(bits >> 12) & 0x3f];
	    result[out_cnt++] = base64_code2[(bits >> 6) & 0x3f];
	    result[out_cnt++] = base64_code2[bits & 0x3f];
	    bits = 0;
	    char_count = 0;
	} else {
	    bits <<= 8;
	}
    }
    if (char_count != 0) {
	bits <<= 16 - (8 * char_count);
	result[out_cnt++] = base64_code2[bits >> 18];
	result[out_cnt++] = base64_code2[(bits >> 12) & 0x3f];
	if (char_count == 1) {
	    result[out_cnt++] = '=';
	    result[out_cnt++] = '=';
	} else {
	    result[out_cnt++] = base64_code2[(bits >> 6) & 0x3f];
	    result[out_cnt++] = '=';
	}
    }
    result[out_cnt] = '\0';	/* terminate */
    return result;
}

/* adopted from http://ftp.sunet.se/pub2/gnu/vm/base64-encode.c with adjustments */
const char *
base64_encode_bin(const char *data, int len)
{
    static char result[BASE64_RESULT_SZ];
    int bits = 0;
    int char_count = 0;
    int out_cnt = 0;

    if (!data)
	return data;

    if (!base64_initialized)
	base64_init();

    while (len-- && out_cnt < sizeof(result) - 5) {
	int c = (unsigned char) *data++;
	bits += c;
	char_count++;
	if (char_count == 3) {
	    result[out_cnt++] = base64_code2[bits >> 18];
	    result[out_cnt++] = base64_code2[(bits >> 12) & 0x3f];
	    result[out_cnt++] = base64_code2[(bits >> 6) & 0x3f];
	    result[out_cnt++] = base64_code2[bits & 0x3f];
	    bits = 0;
	    char_count = 0;
	} else {
	    bits <<= 8;
	}
    }
    if (char_count != 0) {
	bits <<= 16 - (8 * char_count);
	result[out_cnt++] = base64_code2[bits >> 18];
	result[out_cnt++] = base64_code2[(bits >> 12) & 0x3f];
	if (char_count == 1) {
	    result[out_cnt++] = '=';
	    result[out_cnt++] = '=';
	} else {
	    result[out_cnt++] = base64_code2[(bits >> 6) & 0x3f];
	    result[out_cnt++] = '=';
	}
    }
    result[out_cnt] = '\0';	/* terminate */
    return result;
}