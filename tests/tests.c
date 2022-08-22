#include<unity.h>
#include"/opt/pehu/var/share/generator/stub/stub.h"
#include<string.h>
#include<stdlib.h>

void setUp(void)
{
stub_pg_ntuples = 0;
stub_pg_skipnull = 0;
stub_pg_send = 0;
stub_pg_resultst = PGRES_TUPLES_OK;
stub_pg_getvalue = 0;
stub_pg_result = (PGresult*)1;
stub_api_params = 0;
stub_api_isadmin=0;
stub_api_execverr=0;
stub_api_inparam=0;
stub_api_execvout=0;
}
void tearDown(void)
{
}
void getprojects_generatedby_generator(void)
{
api_ctx ctx;
memset(&ctx, 0, sizeof(api_ctx));
stub_pg_ntuples=1;
char *pg_vals[] = {"sfsdgfd"};
stub_pg_getvalue=pg_vals;
getprojects(&ctx);
TEST_ASSERT_EQUAL(0, ctx.error);
TEST_ASSERT_GREATER_THAN(0, ctx.out);
TEST_ASSERT_EQUAL_STRING("sfsdgfd", ctx.out);
free(ctx.out);
}
void getproject_generatedby_generator(void)
{
api_ctx ctx;
memset(&ctx, 0, sizeof(api_ctx));
stub_pg_ntuples=1;
char *pg_vals[] = {"sfsdgfd"};
stub_pg_getvalue=pg_vals;
getproject(&ctx);
TEST_ASSERT_EQUAL(0, ctx.error);
TEST_ASSERT_GREATER_THAN(0, ctx.out);
TEST_ASSERT_EQUAL_STRING("sfsdgfd", ctx.out);
free(ctx.out);
}
void newproject_generatedby_generator(void)
{
api_ctx ctx;
memset(&ctx, 0, sizeof(api_ctx));
stub_pg_ntuples=1;
char *pg_vals[] = {"sfsdgfd"};
stub_pg_getvalue=pg_vals;
newproject(&ctx);
TEST_ASSERT_EQUAL(0, ctx.error);
TEST_ASSERT_GREATER_THAN(0, ctx.out);
TEST_ASSERT_EQUAL_STRING("sfsdgfd", ctx.out);
free(ctx.out);
}
void addmembers_generatedby_generator(void)
{
api_ctx ctx;
memset(&ctx, 0, sizeof(api_ctx));
stub_pg_ntuples=1;
char *pg_vals[] = {"sffsdfsd"};
stub_pg_getvalue=pg_vals;
addmembers(&ctx);
TEST_ASSERT_EQUAL(0, ctx.error);
TEST_ASSERT_GREATER_THAN(0, ctx.out);
TEST_ASSERT_EQUAL_STRING("sffsdfsd", ctx.out);
free(ctx.out);
}
void getmembers_generatedby_generator(void)
{
api_ctx ctx;
memset(&ctx, 0, sizeof(api_ctx));
stub_pg_ntuples=1;
char *pg_vals[] = {"sfsdff"};
stub_pg_getvalue=pg_vals;
getmembers(&ctx);
TEST_ASSERT_EQUAL(0, ctx.error);
TEST_ASSERT_GREATER_THAN(0, ctx.out);
TEST_ASSERT_EQUAL_STRING("sfsdff", ctx.out);
free(ctx.out);
}
void addtaskmembers_generatedby_generator(void)
{
api_ctx ctx;
memset(&ctx, 0, sizeof(api_ctx));
stub_pg_ntuples=1;
char *pg_vals[] = {"sfsdff"};
stub_pg_getvalue=pg_vals;
addtaskmembers(&ctx);
TEST_ASSERT_EQUAL(0, ctx.error);
TEST_ASSERT_GREATER_THAN(0, ctx.out);
TEST_ASSERT_EQUAL_STRING("sfsdff", ctx.out);
free(ctx.out);
}
int main(void)
{
UNITY_BEGIN();
RUN_TEST(getprojects_generatedby_generator);RUN_TEST(getproject_generatedby_generator);RUN_TEST(newproject_generatedby_generator);RUN_TEST(addmembers_generatedby_generator);RUN_TEST(getmembers_generatedby_generator);RUN_TEST(addtaskmembers_generatedby_generator);
return UNITY_END();
}

