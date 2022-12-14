USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Products_Delete]    Script Date: 11/18/2022 3:12:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Gideon Macapagal
-- Create date: October 20, 2022
-- Description: Delete product (updating status to inactive) by Id.
-- Code Reviewer: Zachary Frappier

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Products_Delete]
			@Id int
			,@UserId int
AS

/*
--------- TEST CODE ----------
DECLARE @Id int = 3;
DECLARE @UserId int = 1;

EXECUTE dbo.Products_Delete @Id
							,@UserId

SELECT *
FROM dbo.Products
*/

BEGIN

	DECLARE @currentDate datetime2 = GETUTCDATE()

	UPDATE [dbo].[Products]
	SET [IsActive] = 0
		,[ModifiedBy] = @UserId
		,[DateModified] = @currentDate
	WHERE Id = @Id


END
GO
