USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[Inventory_Delete_ById]    Script Date: 11/23/2022 3:33:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Gideon Macapagal
-- Create date: November 16 2022
-- Description: Update record to dbo.Inventory
-- Code Reviewer: Victoria Sanchez

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- =============================================

CREATE PROC [dbo].[Inventory_Delete_ById]
		@Id int
		,@UserId int
AS

/*
--------- TEST CODE ----------
DECLARE @Id int = 6
		,@UserId int = 75

EXECUTE dbo.Inventory_Delete_ById
		@Id
		,@UserId


SELECT *
FROM dbo.Inventory
WHERE Id = @Id

*/

BEGIN

DECLARE @DateNow datetime2 = GetUTCDATE();

UPDATE [dbo].[Inventory]
SET    [IsActive] = 0
       ,[ModifiedBy] = @UserId
       ,[DateModified] = @DateNow

WHERE Id = @Id

END
GO
